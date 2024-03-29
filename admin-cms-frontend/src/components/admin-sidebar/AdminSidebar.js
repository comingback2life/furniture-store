import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { adminLogout } from '../../pages/register-login/signInUpAction';
import { toggleSideBar } from '../../system-state/systemSlice';
export const AdminSidebar = () => {
	const dispatch = useDispatch();
	const { showAdminSideBar } = useSelector((state) => state.system);
	return (
		<>
			<Offcanvas
				show={showAdminSideBar}
				onHide={() => dispatch(toggleSideBar())}
			>
				<Offcanvas.Header closeButton onClick={() => {}}>
					<Offcanvas.Title>
						Hello, Admin <i className="fa-solid fa-users"></i>
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<ListGroup variant="flush" className="fs-6">
						<ListGroup.Item onClick={() => dispatch(toggleSideBar())}>
							<Link className="nav-link" to="/home">
								<i className="fa-solid fa-house-chimney"></i> Home
							</Link>
						</ListGroup.Item>
						<ListGroup.Item onClick={() => dispatch(toggleSideBar())}>
							<Link className="nav-link" to="/admin/dashboard">
								<i className="fa-solid fa-gauge"></i> Dashboard
							</Link>
						</ListGroup.Item>
						<ListGroup.Item onClick={() => dispatch(toggleSideBar())}>
							<Link className="nav-link" to="/admin/customers">
								<i className="fa-solid fa-people-roof"></i> Customers
							</Link>
						</ListGroup.Item>
						<ListGroup.Item onClick={() => dispatch(toggleSideBar())}>
							<Link className="nav-link" to="/admin/orders">
								<i className="fa-solid fa-table-cells"></i> Orders
							</Link>
						</ListGroup.Item>
						<ListGroup.Item onClick={() => dispatch(toggleSideBar())}>
							<Link className="nav-link" to="/products">
								<i className="fa-solid fa-hand-holding-hand"></i> Products
							</Link>
						</ListGroup.Item>
						<ListGroup.Item onClick={() => dispatch(toggleSideBar())}>
							<Link className="nav-link" to="/categories">
								<i className="fa-solid fa-sitemap"></i> Categories
							</Link>
						</ListGroup.Item>
						<ListGroup.Item onClick={() => dispatch(toggleSideBar())}>
							<Link className="nav-link" to="/payments">
								<i className="fa-solid fa-dollar-sign"></i> Payments
							</Link>
						</ListGroup.Item>
						<ListGroup.Item onClick={() => dispatch(toggleSideBar())}>
							<Link className="nav-link" to="/admin-profile">
								<i className="fa-solid fa-user-pen"></i> Admin Profile
							</Link>
						</ListGroup.Item>
						<ListGroup.Item onClick={() => dispatch(toggleSideBar())}>
							<Link className="nav-link" to="/settings">
								<i className="fa-solid fa-list-check"></i> Settings
							</Link>
						</ListGroup.Item>
						<ListGroup.Item onClick={() => dispatch(adminLogout())}>
							<Link className="nav-link" to="#">
								<i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
							</Link>
						</ListGroup.Item>
					</ListGroup>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};
