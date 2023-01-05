import React from 'react'
import { MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBBtn } from 'mdb-react-ui-kit'

interface PaginationTypes {
	currentPage: any
	pageLimit: any
	loadPostData: any
	data: any
	totalPost: any
}

const Pagination = ({ currentPage, pageLimit, loadPostData, data, totalPost }: PaginationTypes) => {
	const renderPagination = () => {
		if (currentPage === 0) {
			return (
				<MDBPagination center className='mb-0'>
					<MDBPaginationItem>
						<MDBPaginationLink>1</MDBPaginationLink>
					</MDBPaginationItem>
					<MDBPaginationItem>
						<MDBPaginationLink>
							<MDBBtn rounded onClick={() => loadPostData(5,10,1)}>
								Next
							</MDBBtn>
						</MDBPaginationLink>
					</MDBPaginationItem>
				</MDBPagination>
			)
		} else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
			;<MDBPagination center className='mb-0'>
				<MDBPaginationItem>
					<MDBBtn rounded onClick={() => loadPostData((currentPage - 1) * 5, currentPage * 5, -1)}>
						Prev
					</MDBBtn>
				</MDBPaginationItem>
				<MDBPaginationItem>
					<MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
				</MDBPaginationItem>
				<MDBPaginationItem>
					<MDBBtn rounded onClick={() => loadPostData((currentPage - 1) * 5, currentPage * 5, -1)}>
						Next
					</MDBBtn>
				</MDBPaginationItem>
			</MDBPagination>
		} else {
			return (
				<MDBPagination center className='mb-0'>
					<MDBPaginationItem>
						<MDBBtn rounded onClick={() => loadPostData((currentPage + 1) * 5, (currentPage + 2) * 5, 1)}>
							Prev
						</MDBBtn>
					</MDBPaginationItem>
					<MDBPaginationItem>
						<MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
					</MDBPaginationItem>
				</MDBPagination> 
			)
		}
	}

	return <div></div>
}

export default Pagination
