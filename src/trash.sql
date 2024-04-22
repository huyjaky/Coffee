SELECT json_build_object(
    'order_history',
    json_build_object(
      'status',
      order_history.status,
      'order_history_products',
      json_agg(
        jsonb_build_object (
          'id_pr',
          order_history_products.id_pr,
          'id_order',
          order_history_products.id_order,
          'id_pr',
          products.id_pr,
          'name_pr',
          products.name_pr,
          'des',
          products.des,
          'imagelink_square',
          products.imagelink_square,
          'imagelink_portrait',
          products.imagelink_portrait,
          'ingredients',
          products.ingredients,
          'special_ingredient',
          products.special_ingredient,
          'average_rating',
          products.average_rating,
          'ratings_count',
          products.ratings_count,
          'favourite',
          products.favourite,
          'type_pr',
          products.type_pr,
          'index_pr',
          products.index_pr,
          'owned_id',
          products.owned_id,
          'derived',
          products.derived,
          'category_pr',
          products.category_pr,
          'status',
          products.status,
          'manage_prices',
          manage_info_json
        )
      )
    ),
  ) as json_ into result
FROM order_history
  INNER JOIN order_history_products ON order_history_products.id_order = order_history.id_order
  INNER JOIN products ON products.id_pr = order_history_products.id_pr
  INNER JOIN (
    SELECT order_history_products.id_order,
      order_history_products.id_pr,
      jsonb_agg(
        jsonb_build_object(
          'quantity',
          manages_prices_order_history.quantity,
          'prices',
          jsonb_build_object(
            'prices_id',
            prices.prices_id,
            'size',
            prices.size,
            'unit',
            prices.unit,
            'price',
            prices.price
          )
        )
      ) AS manage_info_json
    FROM order_history_products
      INNER JOIN manages_prices_order_history ON manages_prices_order_history.id_history_products = order_history_products.id_history_products
      inner join prices on manages_prices_order_history.prices_id = prices.prices_id
    GROUP BY order_history_products.id_order,
      order_history_products.id_pr
  ) AS manage_info_subquery ON order_history.id_order = manage_info_subquery.id_order
  AND order_history_products.id_pr = manage_info_subquery.id_pr
where order_history.id_order = ''
GROUP BY order_history.id_order;