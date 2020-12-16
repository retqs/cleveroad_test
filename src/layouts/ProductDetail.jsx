import {Button, Container} from '../assets/styles';
import React,{useCallback, useEffect, useState} from 'react'
import {createProduct, updateProduct} from '../store/actions/productsAction'
import {useHistory, useParams} from 'react-router-dom'

import {ReactComponent as ArrowLeft} from '../assets/icons/leftArrow.svg'
import DBController from '../utils/dbController';
import InputField from '../components/shared/InputField.component';
import Textarea from '../components/shared/Textarea.component';
import {storage} from '../utils';
import styled from 'styled-components';
import {useDispatch} from 'react-redux'

function ProductDetail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const [formValue, setFormValue] = useState({
        title: '',
        image: '',
        description: '',
        price: 0,
        sale: 0,
        saleEndDate: ''
    });
    
    const d = new Date(Date.now());
    d.setDate(new Date().getDate() + 1);
    const minDate = new Date(d.getTime() - d.getTimezoneOffset() * 120 * 1000).toISOString().split('T')[0];

    const [errors, setErrors] = useState({});
    
    const handleChange = useCallback((e) => {
        const target = e.target;

        const value = target.value;
        
        if(target.type === 'file') {
            const MIN_SIZE = 200;
            const MAX_SIZE = 4000;

            const file = target.files[0];
            const img = new Image();

            img.src = window.URL.createObjectURL(file);
            img.onload = async () => {
                if((img.height < MIN_SIZE || img.height > MAX_SIZE) || (img.width < MIN_SIZE || img.width > MAX_SIZE)) {
                    setErrors({...errors,image: 'File\'s size should be between 200px or 4000px'});
                    return;
                } else {
                    const fileRef = storage.child(file.name);
                    await fileRef.put(file); 
                    const fileUrl = await fileRef.getDownloadURL();
                    
                    setErrors({...errors, image: null});
                    setFormValue({
                        ...formValue,
                        [target.name]: fileUrl
                    });
                    return;
                }
            }
            return;
        }

        setFormValue({
            ...formValue,
            [target.name]: value
        });

    },[formValue])
    
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const errorsQuantity = validateValues(formValue);

        if(errorsQuantity === 0 && !errors.image) {
            params.id? dispatch(updateProduct(formValue)) : dispatch(createProduct(formValue));
        }

    },[formValue,dispatch,params,errors]);
    
    useEffect(() => {
        if(params.id) {
            const handleProduct = (product) => {
                const id = product.key;
                const data = product.val();
                
                setFormValue({
                    id,
                    ...data
                });
            }
            
            DBController.getProduct(params.id).on("value",handleProduct);
        }
    },[params]);
    
    const validateValues = (formValue) => {
        let errorsObj = {};

        Object.entries(formValue).forEach(([key,value]) => {
            if(key === 'title') {
                value.length <= 20 && (errorsObj.title = "Should be between 20 and 60");
            } else if(key === 'price') {
                value >= 99999999.99 && (errorsObj.price = 'Price Should be less than 99999999.99');
                // max='9999999999'
                value < 1 && (errorsObj.price = "Price required");
                console.log(value);
                !/^\d+(\.\d{1,2})?$/.test(value) && (errorsObj.price = 'Price format should be with two trailing number 999.99') 
            } else if(key === 'image') {
                value.length === 0 && (errorsObj.image = "Image required");
            }  else if(key === 'saleEndDate') {
                formValue.sale > 1 && value.length === 0 && (errorsObj.saleEndDate = "Sale End Day Required"); 
            }
        });

        setErrors(errorsObj);

        return Object.values(errorsObj).length;
    }
    
    return (
        <Container>
            <FormContainer>
                <Form onSubmit={onSubmit}>
                    <FormBack type='button' onClick={() => history.goBack()}>
                      <ArrowLeft></ArrowLeft>  Back
                    </FormBack>

                    <FormRow>
                        <FormCol>
                            <InputField
                                name='title'
                                label="Title*"
                                type='text'
                                value={formValue.title}
                                onChange={handleChange}
                                errors={errors}
                            ></InputField>
                        </FormCol>
                        <FormCol>
                            <InputField
                                name='image'
                                label="Image*"
                                type='file'
                                onChange={handleChange}
                                errors={errors}
                            ></InputField>
                            {formValue.image.length !== 0 && (
                                <img style={{height: '50px',width: '50px'}} src={formValue.image} alt='product'></img>
                            )}
                        </FormCol>
                    </FormRow>
                    
                    <FormRow>
                        <Textarea
                            name='description'
                            label="Description"
                            value={formValue.description}
                            onChange={handleChange}
                            errors={errors}
                            maxLength='200'
                        ></Textarea>
                        <Remark>Symbols left {200 - formValue.description.length}</Remark>
                    </FormRow>

                    <FormRow>
                        <FormCol>
                            <InputField
                                name='price'
                                label="Price*"
                                type='number'
                                value={formValue.price}
                                onChange={handleChange}
                                errors={errors}
                     
                                min='0'
                            ></InputField>
                        </FormCol>
                        <FormCol>
                            <InputField
                                name='sale'
                                label="Sale"
                                type='number'
                                value={formValue.sale}
                                onChange={handleChange}
                                errors={errors}
                                min='0'
                                max='100'
                            ></InputField>
                        </FormCol>
                    </FormRow>

                    <InputField
                        name='saleEndDate'
                        label="Sale End Date"
                        type='date'
                        value={formValue.saleEndDate}
                        onChange={handleChange}
                        errors={errors}
                        disabled={+formValue.sale === 0}
                        min={minDate}
                    ></InputField>

                    <SubmitBtn type='submit'>
                        {params.id? 'Update Product' : 'Add Product'} 
                    </SubmitBtn>
                </Form>
            </FormContainer>
        </Container>
    )
}

const FormContainer = styled.div`
    background: #fff;
    max-width: 768px;
    height: 100%;
    border-radius: 8px;
    border: 1px solid #ccc;
`

const FormCol = styled.div`
    min-width: 320px;
    height: 100%;
    padding: 0 5px;
`

const FormRow = styled.div`
    position:relative;
    width: 100%;
    height: 100%;

    display:flex;
    flex-flow: row wrap;
`

const Remark = styled.span`
    position:absolute;
    bottom: -5px;
    right: 0px;
    color: #ccc;
    text-transform: capitalize;
`

const FormBack = styled(Button)`
    position:absolute;
    top: 10px;
    left: 5px;
    font-size: 1.2rem;

    display: flex;
    align-items:center;
    justify-content:center;

    svg {
        height: 20px;
        width: 100%;
    }
`

const Form = styled.form`
    height: 100%;
    width: 100%;
    position:relative;
    padding: 20px;
    padding-top: 40px;
`

const SubmitBtn = styled(Button)`
    background: purple;
    padding: 20px;
    color: #fff;
    margin-top: 50px;
    width: 100%;
    border-radius: 8px;
    font-size: 20px;
`

export default ProductDetail
