function Upgrade({ bought, name, price, onBuy, canAfford }) {
    return (
        <div className="upgrade">
            <div className="bought">{bought}</div>
            <div className="description">
                <div className="name">{name}</div>
                <div className="price">{price} Clicks</div>
                <button onClick={onBuy} disabled={!canAfford}>Buy</button>
            </div>
        </div>
    );
}
export default Upgrade;