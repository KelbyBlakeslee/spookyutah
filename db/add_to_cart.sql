insert into carts (user_id, product_id, quantity)
values
($1, $2, $3);

select p.product_id, p.product, p.image, p.price from carts c
join products p on c.product_id = p.product_id
where user_id = $1
order by c.cart_id;