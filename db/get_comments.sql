select * from locations
join comments on comments.loc_id = locations.loc_id
where locations.loc_id = $1
order by ASC;