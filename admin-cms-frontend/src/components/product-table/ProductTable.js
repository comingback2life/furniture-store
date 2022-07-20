import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAction } from '../../pages/product/productActions';
const ProductTable = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.products);
	useEffect(() => {
		dispatch(fetchProductsAction());
	}, []);

	// const handleOnDelete = (_id) => {
	// 	if (window.confirm('Are you sure you want to delete this category?')) {
	// 		dispatch(deleteCategoriesAction(_id));
	// 	}
	// };
	return (
		<div>
			<p className="text-lead"> {products.length} Products found !</p>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>SKU</th>
						<th>Status</th>
						<th>Qty</th>
						<th>Price</th>
						<th>Sale Price</th>
						<th>Sale End Date</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{products.map((item, i) => {
						return (
							<tr key={item._id}>
								<td>{i + 1}</td>
								<td>{item.name}</td>
								<td>{item.SKU}</td>
								<td
									className={
										item.status === 'active' ? 'text-success' : 'text-danger'
									}
								>
									{item.status}
								</td>
								<td>{item.quantity}</td>
								<td>${item.price.toLocaleString('en-AU')}</td>
								<td>{item.salePrice || '-'}</td>
								<td>{item.salesDate || '-'}</td>
								<td>
									<Button variant="warning" className="mx-1">
										Edit
									</Button>
									<Button
										title="You can only delete if Child category does not exist"
										// onClick={() => handleOnDelete(item._id)}
										variant="danger"
										className="mx-1"
									>
										Delete
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
};

export default ProductTable;
