import { useContext } from "react";
import { CartContext } from "../../contexts/cart-context";
import CustomButton from "../custom-button";
import {
	BuyNowFullText,
	BuyNowText,
	CardContainer,
	CardDetails,
	CardImage,
	CardTitle,
	Description,
	DescriptionBlock,
	ImgBlock,
	PriceContainer,
} from "./styles";

import "./styles.css";

const ProductCard = ({ product }) => {
	const { name, imageURL, description, price } = product;
	const { dispatch } = useContext(CartContext);

	const handleAddToCart = async (item) => {
		await fetch("http://localhost:5000/addToCart", {
			method: "POST",
			body: JSON.stringify({ productId: item.id }),
		})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				dispatch({
					type: "ADD_TO_CART",
					payload: item,
				});
			})
			.catch((err) => {
				console.log("Failed to add to cart", err.message);
			});
	};

	const getFullBuyNowText = () => {
		return (
			<BuyNowFullText>
				<CustomButton isAuth onClick={() => handleAddToCart(product)}>
					{`Buy Now @ MRP Rs.${price}`}
				</CustomButton>
			</BuyNowFullText>
		);
	};

	return (
		<CardContainer>
			<CardTitle>{name}</CardTitle>
			<CardDetails>
				<ImgBlock>
					<CardImage src={imageURL} alt={name} />
				</ImgBlock>
				<DescriptionBlock>
					<Description>{description}</Description>
					<div className="mobile_show">{getFullBuyNowText()}</div>
				</DescriptionBlock>
			</CardDetails>

			<div className="tablet_show">{getFullBuyNowText()}</div>

			<PriceContainer>
				<span>{`MRP Rs.${price}`}</span>
				<BuyNowText>
					<CustomButton onClick={() => handleAddToCart(product)}>
						Buy Now
					</CustomButton>
				</BuyNowText>
			</PriceContainer>
		</CardContainer>
	);
};

export default ProductCard;
