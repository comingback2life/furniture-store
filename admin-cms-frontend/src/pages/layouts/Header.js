import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideBar } from '../../system-state/systemSlice';
export const Header = () => {
	const { user } = useSelector((state) => state.admin);
	const dispatch = useDispatch();
	return (
		<div>
			<Navbar bg="none" expand="md" className="p-3">
				<Container>
					{user?._id && (
						<>
							<Button
								variant="btn-outline"
								onClick={() => {
									dispatch(toggleSideBar());
								}}
							>
								{' '}
								<i className="fa-solid fa-bars"></i>
							</Button>
						</>
					)}

					<LinkContainer to="/">
						<Navbar.Brand>eCommerce Admin</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							{!user._id ? (
								<>
									<Link to="/admin/login " className="nav-link">
										Login
									</Link>
								</>
							) : (
								<>
									<Link to="/admin/register" className="nav-link">
										Register New Admin
									</Link>
									<i className="fa-solid fa-bell mt-1 p-2"></i>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};
