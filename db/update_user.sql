update users
set first_name = $1,
    last_name = $2
    where user_id = $3;