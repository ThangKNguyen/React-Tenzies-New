export default function Dice(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return(
        <div  onClick={props.holdDice} style={styles} className="die">
           <h2 className="die-num">{props.value}</h2> 
        </div>
    )

}