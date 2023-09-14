import PropTypes from 'prop-types'
import './bottle.css'
const Bottle = ({ bottle, handleBottlePurchase }) => {
    const { name, img, price } = bottle;
    return (
        <div className="bottle">
            <h3>Name: {name} </h3>
            <img src={img} alt="" />
            <p>Price: ${price}</p>
            <button onClick={() => handleBottlePurchase(bottle)}>Purchase</button>
        </div>
    );
};

Bottle.propTypes = {
    bottle: PropTypes.object.isRequired,
    handleBottlePurchase: PropTypes.func.isRequired
}

export default Bottle;