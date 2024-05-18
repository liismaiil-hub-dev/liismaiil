import React, { Component } from "react";

import ChartWrapper from "./ChartWrapper";

class Organisation extends Component {
    state = {
        gender: "men",
    };

    genderSelected = (gender) => this.setState({ gender });

    render() {
        return (
            <div className="Organisation">
                
                <Container>
                    <Row>
                        <Col xs={12}>
                            <div>voila</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <ChartWrapper gender={this.state.gender} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Organisation;
