select * from locations
left join comments on comments.loc_id = locations.loc_id
where locations.loc_id = $1;