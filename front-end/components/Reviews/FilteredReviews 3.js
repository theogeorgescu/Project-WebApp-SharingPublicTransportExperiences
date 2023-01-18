import React from 'react';
import { Table } from 'react-bootstrap';
import Axios from 'axios';
import { getToken } from '../../services/Token';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
const backUrl = require("../../../src/configuration.json").backend_url;



export default class FilteredReviews extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            editButtonText: "Editeaza",
            isOk: true
        }
    }

    validateFields = (review) => {

        review.leaving_point = review.leaving_point.toUpperCase();
        review.arriving_point = review.arriving_point.toUpperCase();

        var id = parseInt(review.duration)
        if (isNaN(id)) {
            toast("Editare eșuată! Durata trebuie exprimată în numărul de minute");
            this.setState({ isOk: false });
        }

        var rating = parseInt(review.rating);
        if (isNaN(rating) || (rating > 5 || rating < 1)) {
            toast("Editare eșuată! Rating-ul trebuie sa fie in intervalul 1 - 5");
            this.setState({ isOk: false });
        }

        var congestion_level = parseInt(review.congestion_level);
        if (isNaN(congestion_level) || (congestion_level > 10 || congestion_level < 1)) {
            toast("Editare eșuată! Nivelul de aglomerare trebuie sa fie in intervalul 1 - 10");
            this.setState({ isOk: false });
        }

        if (/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(review.leaving_hour) === false) {
            toast("Editare eșuată! Ora plecării nu este validă!");
            this.setState({ isOk: false });
        }
    }

    componentDidMount = () => {
        Axios.get(backUrl + '/reviews/user/' + this.props.userId).then(
            res => {
                this.setState({ reviews: res.data });
            }
        )
    }

    deleteReview(id) {
        Axios.delete(backUrl + '/reviews/' + id).then(toast('Recenzia a fost stearsa cu succes!'));
        var reviewsCopy = [...this.state.reviews];
        var review = reviewsCopy.find(review => review.id === id);
        var index = reviewsCopy.indexOf(review);

        reviewsCopy.splice(index, 1);
        this.setState({ reviews: reviewsCopy });

    }

    editContent = async (id) => {
        if (document.getElementById("button" + id).innerHTML === "Editeaza") {
            document.getElementById("button" + id).innerHTML = "Salveaza";

            document.getElementById(id).contentEditable = true;
            document.getElementById(id).childNodes[0].contentEditable = false;
        }

        else {
            document.getElementById(id).contentEditable = false;


            var tabelRaw = document.getElementById(id);
            let reviewId;
            let userId;
            let transportTypeId;

            await Axios.get(backUrl + '/reviews/' + id).then(res => {
                reviewId = res.data.id;
                userId = res.data.userId;
                transportTypeId = res.data.userId;
            })
            this.setState({ isOk: true });
            var review = {
                id: reviewId,
                leaving_point: tabelRaw.childNodes[1].innerText,
                arriving_point: tabelRaw.childNodes[2].innerText,
                leaving_hour: tabelRaw.childNodes[3].innerText,
                duration: parseInt(tabelRaw.childNodes[4].innerText),
                observations: tabelRaw.childNodes[6].innerText,
                rating: tabelRaw.childNodes[7].innerText,
                congestion_level: parseInt(tabelRaw.childNodes[5].innerText),
                userId: userId,
                transportTypeId: transportTypeId,

            }

            await this.validateFields(review);
            if (this.state.isOk === true) {
                Axios.put(backUrl + '/reviews/' + id, review, { headers: { "Authorization": getToken() } }).then(toast("Recenzia a fost editata cu succes!"));
            }
            document.getElementById("button" + id).innerHTML = "Editeaza";

        }

    }
    render() {


        return <>
            <Table striped bordered hover responsive>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Punct de plecare</th>
                        <th>Destinație</th>
                        <th>Ora plecării</th>
                        <th>Durata călătoriei</th>
                        <th>Nivelul de aglomerare</th>
                        <th>Observații</th>
                        <th>Rating</th>
                    </tr>
                    {this.props.allowEditing === true ?
                        this.state.reviews.map(review =>

                            <tr id={review.id} key={review.id}>
                                <td>{review.transportTypeId}</td>
                                <td>{review.leaving_point}</td>
                                <td>{review.arriving_point}</td>
                                <td>{review.leaving_hour}</td>
                                <td>{review.duration}</td>
                                <td>{review.congestion_level}</td>
                                <td>{review.observations}</td>
                                <td>{review.rating}</td>
                                <td><Button id={"button" + review.id} className="btn-primary" onClick={() => { this.editContent(review.id) }}>Editeaza</Button>
                                    <Button className="btn-danger" onClick={() => { this.deleteReview(review.id) }}>Sterge</Button>
                                </td>
                            </tr>) :
                        this.props.reviews.map(review =>

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
}