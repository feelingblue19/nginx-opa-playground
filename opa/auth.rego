package httpapi.opa

import future.keywords.contains
import future.keywords.if
import future.keywords.in

default allow := false

allow if {
	some grant in user_is_granted

	input.method == grant.method
	input.path == grant.path
}

user_is_granted contains grant if {
	some role in data.user_roles[claims.username]
    
	some grant in data.role_grants[role]
}

claims := payload if {
	io.jwt.verify_hs256(bearer_token, opa.runtime()["env"]["JWT_KEY"])

	[_, payload, _] := io.jwt.decode(bearer_token)
}

bearer_token := t if {
	v := input.authorization
	startswith(v, "Bearer ")
	t := substring(v, count("Bearer "), -1)
}