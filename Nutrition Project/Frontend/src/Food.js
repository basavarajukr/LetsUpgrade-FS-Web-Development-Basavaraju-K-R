import React, { Component } from 'react'

export default class Food extends Component {

    constructor(props){
        super(props);

        this.state={
            foods:[],
            searchedFoods:[],
            currentFood:{
                name:"-",
                calories:0,
                protein:0,
                carbs:0,
                fats:0,
                fibre:0,
                weight:100,
            }
        
        }
    }

    selectFood(food){
        this.setState({currentFood:food});
    }

    calculateChanges(weight){
        
        let currFood = this.state.currentFood;

        if(weight!=="" && weight!==0 )
        {

        currFood.calories=Number((currFood.calories * weight)/currFood.weight);
        currFood.carbs=Number((currFood.carbs * weight)/currFood.weight);
        currFood.protein=Number((currFood.protein * weight)/currFood.weight);
        currFood.fibre=Number((currFood.fibre * weight)/currFood.weight);
        currFood.fats=Number((currFood.fats * weight)/currFood.weight);
        currFood.weight=Number(weight);

        

        this.setState({currentFood:currFood});
        }
        

    
    }

    searchFood(value){

        if(value!=="")
        {
        
        let searchedArray = this.state.foods.filter((food,index)=>{
            return food.name.toLowerCase().includes(value.toLowerCase());
        })

        this.setState({searchedFoods:searchedArray});
        }

        else{
            this.setState({searchedFoods:[]});
        }

    }

    componentDidMount(){

        fetch("http://localhost:8000/foods")
        .then((response=>response.json()))
        .then((foodsResponse)=> {
            this.setState({foods:foodsResponse.foods})
        })
        .catch((err)=> {
            console.log(err);
        })


    }


    render() {
        return (
            <div className="container">
                <div className="form-group" style={{marginTop:"30px"}}>
                    <input className="form-control" onChange={(event)=> {
                        this.searchFood(event.target.value)
                    }} placeholder="Search food"></input>
                </div>
                <div className="search-result">
                    {
                        this.state.searchedFoods.map((food,index)=>(
                            <div className="result" style={{cursor:"pointer",padding:"10px"}} onClick={()=> {
                                this.selectFood(food);
                            }} key={index}>
                                {food.name}
                            </div>
                        ))
                    }
                    
                </div>

                <div className="product-display">
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Calories</td>
                                <td>Protein</td>
                                <td>Carbs</td>
                                <td>Fibre</td>
                                <td>Fat</td>
                                <td>Weight</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.currentFood.name}</td>
                                <td>{this.state.currentFood.calories.toFixed(2)}</td>
                                <td>{this.state.currentFood.protein.toFixed(2)}</td>
                                <td>{this.state.currentFood.carbs.toFixed(2)}</td>
                                <td>{this.state.currentFood.fibre.toFixed(2)}</td>
                                <td>{this.state.currentFood.fats.toFixed(2)}</td>
                                <td><input type="text" defaultValue={this.state.currentFood.weight} onChange={(event)=>{
                                    this.calculateChanges(Number(event.target.value));
                                }}></input>
                                </td>
                                                                
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}