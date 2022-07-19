import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../pages/product/productActions';
const ProductTable = () => {
	const dispatch = useDispatch();
	const [selectedCategory, setSelectedCategory] = useState({});
	const { products } = useSelector((state) => state.products);
	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	console.log(products);
	// const handleOnDelete = (_id) => {
	// 	if (window.confirm('Are you sure you want to delete this category?')) {
	// 		dispatch(deleteCategoriesAction(_id));
	// 	}
	// };

	const parentCategories = products.filter((item) => !item.parentCatId);
	const childrenCategories = products.filter((item) => item.parentCatId);
	return (
		<div>
			<p className="text-lead"> {products.length} Categories found !</p>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Name</th>

						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{parentCategories.map((item, i) => {
						return (
							<>
								<tr key={item._id}>
									<td>{item.name}</td>
									<td
										className={
											item.status === 'active' ? 'text-success' : 'text-danger'
										}
									>
										{item.status}
									</td>

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
								{childrenCategories.map((cat, index) => {
									if (cat.parentCatId === item._id) {
										return (
											<tr key={cat._id}>
												<td>
													{' '}
													<i className="fa-solid fa-arrow-right"></i>{' '}
													{cat.catName}
												</td>
												<td
													className={
														cat.status === 'active'
															? 'text-success'
															: 'text-danger'
													}
												>
													{cat.status}
												</td>
												<td>
													<Button variant="warning" className="mx-1">
														Edit
													</Button>
													<Button
														title="You can only delete if Child category does not exist"
														// onClick={() => handleOnDelete(cat._id)}
														variant="danger"
														className="mx-1"
													>
														Delete
													</Button>
												</td>
											</tr>
										);
									}
								})}
							</>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
};

export default ProductTable;
