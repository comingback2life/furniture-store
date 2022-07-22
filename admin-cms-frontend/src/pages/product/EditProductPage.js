import React from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { EditProductForm } from '../../components/product-form/EditProductForm.js';
import AdminLayout from '../layouts/AdminLayout.js';
import { fetchSingleProductAction } from './productActions.js';

const EditProductPage = () => {
	const { _id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		_id && dispatch(fetchSingleProductAction(_id));
	}, [_id]);
	return (
		<AdminLayout>
			<div className="">
				<Link to="/products">
					<Button variant="none" className=" mb-2">
						<i className="fa-solid fa-chevron-left"></i> Product Listing
					</Button>
				</Link>
			</div>
			<h3 className="mt-2 mb-4 text-center">Edit Product</h3>
			<hr />
			<EditProductForm />
		</AdminLayout>
	);
};
export default EditProductPage;
