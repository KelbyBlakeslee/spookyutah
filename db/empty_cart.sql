delete from carts where user_id = $1;

select p.product_id, p.product, p.image, p.price from carts c
join products p on c.product_id = p.product_id
where user_id = $1
order by c.cart_id;