import React, { Component } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Gerichte from './Gerichte';
import { withStyles } from '@material-ui/core/styles';
import LikeIcon from './likeIcon function way'



function FormatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function isEmpty(date) {
    if (date == null) {
        return false
    } else {
        return true
    }
}

function todayData(dateNow) {
    var dateNow = new Date(dateNow)
    return dateNow
}

const useStyles = theme => ({
    root: {
        minWidth: 70,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 10,
        margin: 'auto',
        position: "left",
        backgroundColor: '#DCDCDC'
    },
    title: {
        fontSize: 200,
    },
    pos: {
        marginBottom: 12,
    },

    flechaDerecha: {
        
        }
});


class TimeHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            date: [],
            mymensa: "",
            isCardView: false,
            safeDate: "",
            daysWeek: "",
            essen: NaN,
        };
        this.nextDay = this.nextDay.bind(this);
        this.backDay = this.backDay.bind(this);
    }



    nextDay(event) {
        this.componentDidMount()
    }

    backDay(event) {
        this.setState({ value: this.state.value - 1 });
        this.componentWillMount()

    }

    componentDidMount() {
        this.setState({ value: this.state.value + 1 });
        var i = this.state.value
        var date = new Date('2019,01,07')
        date.setDate(date.getDate() + i)
        let day_date = FormatDate(date)
        const days = ["Mon", "Di", "Mi", "Do", "Fr", "Sa", "So"]
        var dayweek = days[date.getDay() - 1]
        console.log(dayweek)
        this.setState({ safeDate: day_date, daysWeek: dayweek })
        var canteen_id = ""

        //https://stackoverflow.com/questions/40981040/using-a-fetch-inside-another-fetch-in-javascript
        var result = fetch('/mymensa', {
            method: 'get',
        }).then(function (response) {
            return response.json(); // pass the data as promise to next then block
        }).then(function (data) {
            canteen_id = data[0].id;

            console.log(canteen_id, '\n' + day_date);
            var url = 'https://openmensa.org/api/v2/canteens/' + canteen_id + '/days/' + day_date
            return fetch(url); // make a 2nd request and return a promise
        })
            .then(function (response) {
                if (response != null) {
                    return response.json();
                }
            })
            .catch(function (error) {
                console.log('Request failed test', error)
            })

        result.then(date => this.setState({ date }));

        var fetchingGerichte = fetch('/mymensa', {
            method: 'get',
        }).then(function (response) {
            return response.json(); // pass the data as promise to next then block
        }).then(function (data) {
            canteen_id = data[0].id;

            console.log(canteen_id, '\n' + day_date);
            var urli = 'https://openmensa.org/api/v2/canteens/' + canteen_id + '/days/' + day_date + '/meals'
            console.log(urli)
            return fetch(urli); // make a 2nd request and return a promise
        })
            .then(function (response) {
                if (response != null) {
                    return response.json();
                }
            })
            .catch(function (error) {
                console.log('Request failed test', error)
            })

        fetchingGerichte.then(essen => this.setState({ essen }));



    }

    componentWillMount() {
        var i = this.state.value - 1
        var date = new Date("2019,01,07")
        date.setDate(date.getDate() + i - 1)
        let day_date = FormatDate(date)
        const days = ["Mon", "Di", "Mi", "Do", "Fr", "Sa", "So"]
        var dayweek = days[date.getDay() - 1]
        console.log(dayweek)
        this.setState({ safeDate: day_date, daysWeek: dayweek })
        var canteen_id = ""

        //https://stackoverflow.com/questions/40981040/using-a-fetch-inside-another-fetch-in-javascript
        var result = fetch('/mymensa', {
            method: 'get',
        }).then(function (response) {
            return response.json(); // pass the data as promise to next then block
        }).then(function (data) {
            canteen_id = data[0].id;

            console.log(canteen_id, '\n' + day_date);
            var url = 'https://openmensa.org/api/v2/canteens/' + canteen_id + '/days/' + day_date
            return fetch(url); // make a 2nd request and return a promise
        })
            .then(function (response) {
                if (response != null) {
                    return response.json();
                }
            })
            .catch(function (error) {
                console.log('Request failed test', error)
            })

        result.then(date => this.setState({ date }));

        var fetchingGerichte = fetch('/mymensa', {
            method: 'get',
        }).then(function (response) {
            return response.json(); // pass the data as promise to next then block
        }).then(function (data) {
            canteen_id = data[0].id;

            console.log(canteen_id, '\n' + day_date);
            var urli = 'https://openmensa.org/api/v2/canteens/' + canteen_id + '/days/' + day_date + '/meals'
            console.log(urli)
            return fetch(urli); // make a 2nd request and return a promise
        })
            .then(function (response) {
                if (response != null) {
                    return response.json();
                }
            })
            .catch(function (error) {
                console.log('Request failed test', error)
            })

        fetchingGerichte.then(essen => this.setState({ essen }));



    }

    EssenFoods() {
        const essen2 = this.state.essen;
        const { classes } = this.props;
        var foods = [];
        if (essen2) {
            for (var i in essen2) {
                foods.push(
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography color="secondary" variant="h5" component="h2">
                                {essen2[i].name}
                            </Typography>
                            <Typography component="h2" color="textSecondary">
                                {essen2[i].notes + ' '}
                            </Typography>
                            <h5>Preis</h5>
                            <Typography component="h2" color="textSecondary">
                                <label>Student: </label>{essen2[i].prices.students + '€'}
                            </Typography>
                            <Typography component="h2" color="textSecondary">
                                <label>Mitarbeiter: </label>{essen2[i].prices.employees + '€'}
                            </Typography>
                            <Typography component="h2" color="textSecondary">
                                <label>Andere: </label>{essen2[i].prices.others + '€'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <LikeIcon g={essen2[i]}/>
                        </CardActions>
                    </Card>
                );
            }
            return foods;
        } else {
        return <p id='#HomeSchedule'>Heute gibt es kein Essen :(</p>;
        }
    };




    render() {
        const isEmpty2 = isEmpty(this.state.date)
        const days = ["Mon", "Di", "Mi", "Do", "Fr", "Sa", "So"]
        var day = NaN
        var dayN = NaN
        const { classes } = this.props;
        return (
            <div>
                <h2 id = 'HomeTitle2'>Öffnungszeiten</h2>
                <hr id='line'></hr>
                {
                    (isEmpty2) ?
                        <div > {
                            day = new Date(this.state.date.date),
                            dayN = days[day.getDay() - 1]
                        }
                            <p>{this.state.date.date}</p>
                            <div >
                                <IconButton color="secondary" aria-label="add an alarm" onClick={this.backDay}>
                                    <ArrowBackIosOutlinedIcon />
                                </IconButton>
                                <IconButton color="secondary" aria-label="add an alarm" onClick={this.nextDay}>
                                    <ArrowForwardIosIcon />
                                </IconButton></div>
                        </div>


                        : <div>
                            <p>{this.state.safeDate}</p>
                            <div >
                                <IconButton color="secondary" aria-label="add an alarm" onClick={this.backDay}>
                                    <ArrowBackIosOutlinedIcon />
                                </IconButton>
                                <IconButton color="secondary" aria-label="add an alarm" onClick={this.nextDay}>
                                    <ArrowForwardIosIcon className={classes.flechaDerecha}/>
                                </IconButton></div>
                        </div>


                }<h2 id='HomeTitle2'>Gerichte</h2>
                <hr id='line'></hr>
                <Gerichte />
                {this.EssenFoods()}
            </div>



        )
    }
}
export default withStyles(useStyles)(TimeHome) 