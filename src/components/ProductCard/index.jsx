import React,{memo} from 'react'
import {formatPrice, getDaysUntil, getNumberWithSale} from '../../utils'

import {Button} from '../../assets/styles'
import {ReactComponent as DeleteIcon} from '../../assets/icons/delete.svg';
import {ReactComponent as EditIcon} from '../../assets/icons/edit.svg';
import {removeProduct} from '../../store/actions/productsAction';
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

function ProductCard({product}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const withSale = getDaysUntil(product.saleEndDate) !== 0 && product.sale >= 10;

    return (
        <Card>
            <CardFigure>
                <img src={product.image} alt="product"/>
            </CardFigure>
            <CardContent>
                <CardTitle>
                    {product.title}
                </CardTitle>
                <CardDescription>
                    {product.description}
                </CardDescription>
                <CardPrice>
                    Price: <Price withSale={withSale}>${formatPrice(product.price)}</Price>
                    {withSale && <CardSale>-{product.sale}%</CardSale>} 
                </CardPrice>
                {withSale && (
                    <>
                    <CardPrice>
                        With Sale: ${formatPrice(getNumberWithSale(product.price,product.sale))}
                    </CardPrice>
                    <SaleDaysOff>
                        Days until sale ends {getDaysUntil(product.saleEndDate)}
                    </SaleDaysOff>
                    </>
                )}
                <CardButtons>
                    <CardButton onClick={() => dispatch(removeProduct(product.id))}>
                        <DeleteIcon></DeleteIcon>
                    </CardButton>
                    <CardButton onClick={() => history.push(`/editProduct/${product.id}`)}>
                        <EditIcon></EditIcon>
                    </CardButton>
                </CardButtons>
            </CardContent>
        </Card>
    )
}

const Card = styled.div`
    position: relative;
    width: 320px;
    margin: 20px;
    background: #fff;
    border-radius: 8px;
    border: 2px solid #ccc;
    padding: 10px;

    &:last-child {
        margin: 20px;
        margin-right: auto;
    }

    @media screen and (max-width: 1180px) {
        margin: 20px 0;
    }

    @media screen and (max-width: 480px) {
        margin: 20px auto;

        &:last-child {
            margin: 20px auto;
        }
    }
`

const CardFigure = styled.figure`
    height: 300px;
    width: 300px;
    margin: auto;
    
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`

const CardContent = styled.div``;

const CardTitle = styled.h2`
    font-weight: 400;
    font-size: 1.2rem;
    word-break: break-word;
`;

const CardDescription = styled.p`
    margin: 10px 0;
    word-break: break-word;
`;

const CardButtons = styled.div`
    margin-top: 20px;

    display: flex;
    align-items:center;
    justify-content:space-between;
`;

const CardPrice = styled.h3`
    font-weight: 400;
    position: relative;
`

const Price = styled.span`
    text-decoration: ${props => props.withSale? 'line-through' : 'none'};
`

const CardButton = styled(Button)`
    background: #f2f2f2;
    padding: 5px;
    border-radius: 8px;

    svg {
        height: 30px;
        width: 30px;
    }
`;

const CardSale = styled.span`
    color: #f84444;
    margin-left: 10px;
`

const SaleDaysOff = styled.div`
    color: purple;
`

export default memo(ProductCard); 
