import React from 'react';
import { Table } from 'react-bootstrap';


export default function AllReviews(props) {
    return <>
    <Table striped bordered hover responsive>
        <tbody>
            <tr >
                <th>ID</th>
                <th>Punct de plecare</th>
                <th>Destinație</th>
                <th>Ora plecării</th>
                <th>Durata călătoriei</th>
                <th>Nivelul de aglomerare</th>
                <th>Observații</th>
                <th>Rating</th>
            </tr>
           {
                props.reviews.map(review =>

                    <tr key={review.id}>
                        <td>{review.transportTypeId}</td>
                        <td>{review.leaving_point}</td>
                        <td>{review.arriving_point}</td>
                        <td>{review.leaving_hour}</td>
                        <td>{review.duration}</td>
                        <td>{review.congestion_level}</td>
                        <td>{review.observations}</td>
                        <td>{review.rating}</td>
                    </tr>)

            }


        </tbody>
    </Table>
</>
}