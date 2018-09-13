select * from carts 
join products on products.product_id = carts.product_id
where user_id = $1;