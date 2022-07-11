import React from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const CategoryTable = () => {
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>#</th>
					<th>Category Name</th>
					<th>Parent Category</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>Mark</td>
					<td>Otto</td>
					<td>
						<Button variant="warning" className="mx-1">
							Edit
						</Button>
						<Button variant="danger" className="mx-1">
							Delete
						</Button>
					</td>
				</tr>
				<tr>
					<td>2</td>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>
						<Button variant="warning" className="mx-1">
							Edit
						</Button>
						<Button variant="danger" className="mx-1">
							Delete
						</Button>
					</td>
				</tr>
			</tbody>
		</Table>
	);
};

export default CategoryTable;
