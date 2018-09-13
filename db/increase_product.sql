update carts 
set quantity = $1
where product_id = $2;

select p.product_id, p.product, p.image, p.price from carts c
join products p on c.product_id = p.product_id
where user_id = $3
order by c.cart_id;