import React from 'react'
import {Container , Row , Col} from 'react-bootstrap'
const FormContainer = ({children}) => {
    return (
        <Container className="d-flex justify-content-center">
            <Row >
                <Col xs={12} md={12}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
