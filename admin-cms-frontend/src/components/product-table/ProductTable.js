import React, { useEffect, useState } from 'react';
import { Button, Form, FormCheck } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteProductsAction,
	fetchProductsAction,
} from '../../pages/product/productActions';
const ProductTable = () => {
	const dispatch = useDispatch();
	const [ids, setIds] = useState([]);
	const { products } = useSelector((state) => state.products);
	useEffect(() => {
		dispatch(fetchProductsAction());
	}, []);

	const handleOnCheckChange = (e) => {
		const { checked, value } = e.target;
		if (value === 'all') {
			if (checked) {
				const allIds = products.map((item) => item._id);
				console.log(allIds);
				setIds(allIds);
			} else {
				setIds([]);
			}
			return;
		}
		checked
			? setIds([...ids, value])
			: setIds(ids.filter((ids) => ids !== value));
	};

	return (
		<div style={{ overflowX: 'scroll' }} className="mb-5">
			<p className="text-lead"> {products.length} Products found !</p>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>
							<Form.Check
								name="status"
								onChange={handleOnCheckChange}
								value="all"
							/>
						</th>
						<th>#</th>
						<th>Name</th>
						<th>SKU</th>
						<th>Status</th>
						<th>Qty</th>
						<th>Price</th>
						<th>Sale Price</th>
						<th>Sale Date</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{products.map((item, i) => {
						return (
							<tr key={item._id}>
								<td>
									<Form.Check
										name="status"
										onChange={handleOnCheckChange}
										value={item._id}
										checked={ids.includes(item._id)}
									/>
								</td>
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
								<td>
									{item.saleStartDate
										? new Date(item.saleStartDate).toLocaleDateString() +
										  '-' +
										  new Date(item.saleEndDate).toLocaleDateString()
										: '-'}
								</td>
								<td>
									<Button variant="warning" className="mx-1">
										Edit
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			<div>
				{ids.length > 0 && (
					<Button
						title="You can only delete if Child category does not exist"
						onClick={() => dispatch(deleteProductsAction(ids)) && setIds([])}
						variant="danger"
						className="mx-1"
					>
						Delete
					</Button>
				)}
			</div>
		</div>
	);
};

export default ProductTable;
