import React, { Component } from 'react'
import Rebase from 're-base';
import appl from '../../Base';
var base = Rebase.createClass(appl.database());
class Establishment extends Component {
    constructor(props){
        super(props);
        this.state ={
            establishments: [
            
            ],
            liked:false,disliked:false,compLik:this.props.establishment.compLik,compDisLik:this.props.establishment.compDisLik,favori:false
        }
    }
    // deltEst=()=>{
    //     console.log(this.props.establishment.key)
    //     // let etat= this.state.establishments.splice(id, 1);
    //     // this.setState({establishments:etat});
    // }
    like=()=>{
        let likComp = this.state.compLik;
        let dislikComp = this.state.compDisLik;
        likComp += !this.state.liked ? 1: -1
        dislikComp += this.state.disliked ? -1: 0
        this.setState({
            liked: !this.state.liked,
            disliked: this.state.disliked ? !this.state.disliked : this.state.disliked,
            compDisLik:dislikComp,compLik:likComp
        })
        base.update(this.props.establishment.key.toString(),{data:{compLik:likComp,compDisLik:dislikComp}})
    }
    dislike=()=>{
        let likComp = this.state.compLik;
        let dislikComp = this.state.compDisLik;
        likComp += this.state.liked ? -1: 0
        dislikComp += !this.state.disliked ? 1: -1
        this.setState({
            disliked: !this.state.disliked,
            liked: this.state.liked ? !this.state.liked : this.state.liked,
            compDisLik:dislikComp,compLik:likComp
        })
        base.update(this.props.establishment.key.toString(),{data:{compLik:likComp,compDisLik:dislikComp}})
    }
    fav=()=>{this.setState({
        favori: !this.state.favori,
    })}
    selecEst=()=>{
        console.log(this.props.establishment.key)
        console.log(this.state.establishments)
        let etat= this.state.establishments.splice(this.props.establishment.key, 1);
        console.log(this.state.establishments)
     this.setState({establishments:this.state.establishments});
    }

    componentDidMount () {
        base.syncState(`/`, {
            context: this,
            state: 'establishments',
            asArray: true
        });
        console.log("componentDidMount")
    }
    render() {
        let upIcon      = <i className="fa fa-thumbs-o-up" aria-hidden="true" ></i>
        let downIcon    = <i className="fa fa-thumbs-o-down" aria-hidden="true" ></i>
        let starIcon    = <i className="fa fa-star-o" aria-hidden="true" ></i>
        let delIcon    = <i className="fa fa-trash-o" aria-hidden="true" ></i>
        if(this.state.liked){
            upIcon = <i className="fa fa-thumbs-up" aria-hidden="true" ></i>
        }
        if(this.state.disliked){
            downIcon = <i className="fa fa-thumbs-down" aria-hidden="true" ></i>
        }
        if (this.state.favori) {
            starIcon = <i className="fa fa-star favoriIcon" aria-hidden="true"></i>
        }
        return (
            <div className='establishment' >
            <div className='establishment-favori' >
                <button className="buttonB" onClick={this.fav}>{ starIcon }</button>
            </div>
                <div className='establishment-description' >
                    <h3>{ this.props.establishment.name }</h3>

                    { this.props.establishment.description } 
                    {/* <br/> */}
                    {/* {this.props.establishment.key} */}
                </div>
                <div className='establishmentLikeDislike' >
                    {/* Au clic sur le bouton on appelle la fonction */}
                    <button className="buttonB" onClick={this.like}>{ upIcon } </button><span>{ this.state.compLik }</span>
                    <button className="buttonB" onClick={this.dislike}>{ downIcon }</button><span>{ this.state.compDisLik }</span>
                </div>
                <div className='establishmentDelete' >
                <button className="buttonB" onClick={this.selecEst}>{ delIcon }</button>
                </div>
            </div>
        );
    }
}

export default Establishment;