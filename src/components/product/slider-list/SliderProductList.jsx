import React from 'react';
import Slider from 'react-slick';
import ProductCard from '../card/ProductCard';
import './slider-product-list.css';

const settingsSlider = {
	dots: true,
	arrows: true,
	infinite: true,
	speed: 500,
	slidesToShow: 4,
	slidesToScroll: 4,
	autoplay: true,
	autoplaySpeed: 5000,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		}
	]
};
function SliderProductList(props) {
	const { list } = props;

	return (
		<div className="slider-product-list">
			<Slider {...settingsSlider}>
				{list.map((item) => (
					<ProductCard key={item.id} item={item} />
				))}
			</Slider>
		</div>
	);
}

export default SliderProductList;
