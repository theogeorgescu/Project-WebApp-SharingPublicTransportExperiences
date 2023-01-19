import React from 'react';
import { Table } from 'react-bootstrap';


export default function AllReviews(props) {
    return <>
    <Table striped bordered hover responsive>
        <tbody>
            <tr >
                <th>ID</th>
                <th>Starting Point</th>
                <th>Destination Point</th>
                <th>Leaving Hour</th>
                <th>Duration</th>
                <th>Congestion Level</th>
                <th>Observations</th>
                <th>Satisfaction Level</th>
            </tr>
           {
                props.reviews.map(review =>

                    <tr key={review.id}>
                        <td>{review.transportTypeId}</td>
                        <td>{review.leaving_point}</td>
                        <td>{review.destination_point}</td>
                        <td>{review.leaving_hour}</td>
                        <td>{review.duration}</td>
                        <td>{review.congestion_level}</td>
                        <td>{review.observations}</td>
                        <td>{review.satisfaction_level}</td>
                    </tr>)

            }


        </tbody>
    </Table>
</>
}