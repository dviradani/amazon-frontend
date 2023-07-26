import { Row,Col } from "react-bootstrap"
import Product from "../Product/Product";

const Products = ({products}) => {
return (
    <>
    <h1>Products</h1>
    <Row>
        {products.map((product) =>(
            <Col key={product.token} lg={3} md={4} sm={6} className="mb-3">
            <Product product={product}></Product>
            </Col>
        ))}
    </Row>
    </>
)
}

export default Products;