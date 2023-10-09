// SingleQuote.js
import { useEffect, useState } from "react"
import "./SingleQuote.css"
import {
    Container, Row, Col, Form, Input, Button, Navbar, Nav,
    NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

import {
    UncontrolledAlert, Card, CardImg, CardBody,
    CardTitle, CardSubtitle, CardText, CardHeader, CardFooter
} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";


function SingleQuote(props) {
    const [data, setData] = useState();
    const fetchRandomQuote = () => {
//        fetch(`http://triviahhh-api-gateway-rhn-engineering-dsch-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/gateway/quotes/random`)
            fetch(`/gateway/quotes/random`)
            .then((response) => response.json())
            .then((actualData) => {
                setData(actualData);
            })
            .catch((err) => {
                console.log(err.message)
            });
    }

    useEffect(() => {
        fetchRandomQuote();
    }, [])

    return (
        <>
            <div className="quote">
                {
                    data &&
                    <Card style={{width:"20rem"}}>
                        <Button onClick={fetchRandomQuote} className="font-weight-bold">Get a random quote</Button>
                        <CardHeader tag="h3">— by {data.author}</CardHeader>
                        <CardBody>
                            <CardText>
                                {data.quotation}
                            </CardText>
                        </CardBody>
                    </Card>
                }
            </div>
        </>
    );
}

export default SingleQuote;