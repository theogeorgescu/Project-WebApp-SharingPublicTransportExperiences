import React from "react";
import Axios from "axios";
import "./ReviewForm.css";
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../../services/Token';
import { toast } from "react-toastify";
const backUrl = require("../../../../src/configuration.json").backend_url;

export default class ReviewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            userId: -1,
            placeholderText: "Example: 300",
            starNumber: 1,
            buttonText: "Submit",
            isOk: true
        }
    }

    transportTypeRef = React.createRef();
    transportNameRef = React.createRef();
    leavingPointRef = React.createRef();
    destinationPointRef = React.createRef();
    durationRef = React.createRef();
    leftHourRef = React.createRef();
    observationsRef = React.createRef();
    congestionLevelRef = React.createRef();


    starClick = (i) => {

        for (let j = 0; j < i; j++) {
            document.getElementById("star" + j).className = "fa fa-star checked";
        }

        for (let j = i; j < 5; j++) {
            document.getElementById("star" + j).className = "fa fa-star";
        }

        this.setState({ starNumber: i });

    }
   
 
   validateFields = () => {

    var obs_length = this.observationsRef.current.value;
    if(obs_length.length > 200)
    {
        this.setState({isOk:false})
        toast("You can't enter more than 200 characters");
    }

    var id = parseInt(this.durationRef.current.value);
    if(isNaN(id) === true)
        {
            this.setState({isOk:false})
            toast("The duration is not a valid number");
        }
        
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        await this.validateFields();
    if(this.state.isOk === true){

    var transportType = {
        name: this.transportNameRef.current.value,
        type: this.transportTypeRef.current.value
    }
    var transportTypeDb;
    await Axios.post(backUrl + "/transport-type", transportType).then(res => {
        transportTypeDb = res.data;
    })

    var review = {
        leaving_point: String(this.leavingPointRef.current.value.toUpperCase()),
        destination_point: String(this.arrivngPointRef.current.value.toUpperCase()),
        leaving_hour: String(this.leftHourRef.current.value),
        duration: parseInt(this.durationRef.current.value),
        observations: String(this.observationsRef.current.value),
        satisfaction_level: String(this.state.starNumber),
        congestion_level: parseInt(this.congestionLevelRef.current.value),
        userId: parseInt(this.props.userId),
        transportTypeId: parseInt(transportTypeDb.id),
    }

    Axios.post(backUrl + "/reviews", review,
        { headers: { "Authorization": getToken() } }).then(res => {
            var existingReviews = [...this.state.reviews];
            existingReviews.push(res.data);
            this.setState({ reviews: existingReviews });
            toast("Review was added succesfully!")
        })
       
    }

    }

    handleSelect = () => {
        switch (this.transportTypeRef.current.value) {
            case "Tram":
                this.setState({ placeholderText: "Example: B-47-ASD" });
                break;
            case "Subway":
                this.setState({ placeholderText: "Example: M2" });
                break;
            default:
                this.setState({ placeholderText: "Example: 300" });

        }
    }



    render() {
        return <>
        <form className="form-container" onSubmit={this.handleSubmit}>
            <label>Select a mean of transport</label>
            <select className="form-control" ref={this.transportTypeRef} onChange={this.handleSelect}>
                <option value="Bus">Bus</option>
                <option value="Tram">Tram</option>
                <option value="Subway">Metro</option>
            </select>
            <label>Mean of transport</label>
            <input type="text" className="transportNamebox" ref={this.transportNameRef} placeholder={this.state.placeholderText} required></input>
            <input type="text" className="transportNamebox" ref={this.leavingPointRef} placeholder="Starting Point" required></input>
            <input type="text" className="transportNamebox" ref={this.arrivngPointRef} placeholder="Destination" required></input>
            <label>Time of leaving</label>
            <input type="time" className="numberInput" ref={this.leftHourRef} required></input>
            <input type="text" className="durationInput" ref={this.durationRef} placeholder="Duration in minutes" required></input>
            <label>Congestion level</label>
            <input type="number" className="numberInput" ref={this.congestionLevelRef} min={1} max={10} placeholder="1 - 10" required></input>
            <label>Observations</label>
            <textarea ref={this.observationsRef} className="textarea"></textarea>
            <label>Satisfaction Level</label>
            <div className="ratingBar">
                <span id={"star0"} onClick={() => this.starClick(1)} className="fa fa-star checked" ></span>
                <span id={'star1'} onClick={() => this.starClick(2)} className="fa fa-star"></span>
                <span id={'star2'} onClick={() => this.starClick(3)} className="fa fa-star"></span>
                <span id={'star3'} onClick={() => this.starClick(4)} className="fa fa-star"></span>
                <span id={'star4'} onClick={() => this.starClick(5)} className="fa fa-star"></span>
            </div>
            <button className="submit-button" type="submit">Adaugă</button>
        </form>
        </>
    }
}