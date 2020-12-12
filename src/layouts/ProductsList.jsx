import {Button, Container} from '../assets/styles'
import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {ReactComponent as AddIcon} from '../assets/icons/add.svg'
import DBController from '../utils/dbController'
import ProductCard from '../components/ProductCard'
import {getProducts} from '../store/actions/productsAction'
import styled from 'styled-components';
import {useHistory} from 'react-router-dom'

function ProductsList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {products, isLoading} = useSelector(state => state.productsReducer)

    useEffect(() => {
        const dataHandler = (items) => {
            let products = [];

            items.forEach(item => {
                let key = item.key;
                let data = item.val()
                
                products.push({
                    id: key,
                    ...data
                })
            });

            dispatch(getProducts(products));
        };

        DBController.getAll().on('value', dataHandler);
        
        return () => DBController.getAll().off('value', dataHandler);
    },[]);

    const generateProductsList = () => {
        if(!products) return <h2>No Products Available right now</h2>;

        return products.map(product => <ProductCard key={product.id} product={product}></ProductCard>)
    }

    return (
        <Container>
            <Nav>
                Add New Product {' '}
                <AddMore onClick={() => history.push('/addProduct')}>
                    <AddIcon></AddIcon>
                </AddMore>
            </Nav>
            <InnerContainer>
                {isLoading? <Loader>Loading...</Loader> : generateProductsList()}
            </InnerContainer>
        </Container>
    )
}

const InnerContainer = styled.div`
    width: 1180px;
    min-height: calc(100vh - 80px);

    display: flex;
    align-items:flex-start;
    justify-content: space-between;
    flex-flow: row wrap;

    @media screen and (max-width: 1180px) {
        width: 100%;
    }
`

const Nav = styled.nav`
    height: 80px;
    width: 100%;

    display:flex;
    align-items:center;
    justify-content: flex-end;
    padding: 0 5rem;
`

const AddMore = styled(Button)`
    height: 50px;
    width: 50px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background: #fff;
    margin-left: 20px;
`

const Loader = styled.div`
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`

export default ProductsList
