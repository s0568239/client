import React, { Component } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import LikeIcon from './likeIcon function way';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

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

const useStyles = theme => ({
    root: {
        minWidth: 70,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 10,
        margin: 'auto',
        position: "left",
        backgroundColor: '#FFFFFF',
        boxShadow: 3
    },
    title: {
        fontSize: 200,
    },
    pos: {
        marginBottom: 12,
    },

    flechaDerecha: {

    },

    Icon: {
        color: 'gray',
        fontSize: '40px'
    },
    likeButton:{
        flexDirection: 'row-reverse'
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
        this.backTime()

    }
    
    componentDidMount() {
        this.setState({ value: this.state.value + 1 });
        var i = this.state.value
        var date = new Date('2019,01,07')
        date.setDate(date.getDate() + i)
        let day_date = FormatDate(date)
        const days = ["Mon", "Di", "Mi", "Do", "Fr", "Sa", "So"]
        var dayweek = days[date.getDay() - 1]

        this.setState({ safeDate: day_date, daysWeek: dayweek })
        var canteen_id = ""

        //https://stackoverflow.com/questions/40981040/using-a-fetch-inside-another-fetch-in-javascript
        var result = fetch('/mymensa', {
            method: 'get',
        }).then(function (response) {
            return response.json(); // pass the data as promise to next then block
        }).then(function (data) {
            canteen_id = data[0].id;

            var url = 'https://openmensa.org/api/v2/canteens/' + canteen_id + '/days/' + day_date
            return fetch(url); // make a 2nd request and return a promise
        })
            .then(function (response) {
                if (response.status === 200) {
                    return response.json();
                }else{
                    throw new Error('Keine Daten von Server zurückbekommen. Entweder ist heute Sonntag oder ist einen Feiertag', response.statusText)
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

            var urli = 'https://openmensa.org/api/v2/canteens/' + canteen_id + '/days/' + day_date + '/meals'
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

        
        fetchingGerichte.then(essen => this.setState({ essen }))
            .then(async() => {
                const response = await fetch('/mygericht')
                const data = await response.json()
                const essen = this.state.essen
                for (var i in essen) {
                    for (var j in data) {
                        if (data[j].name == essen[i].name && Notification.permission === "granted") {
                            
                            NotificationManager.info('Heute gibt es ' + essen[i].name);
                        }

                    }
                }

            }
            );
    }

    backTime() {
        var i = this.state.value - 1
        var date = new Date("2019,01,07")
        date.setDate(date.getDate() + i - 1)
        let day_date = FormatDate(date)
        this.setState({ safeDate: day_date})
        var canteen_id = ""

        //https://stackoverflow.com/questions/40981040/using-a-fetch-inside-another-fetch-in-javascript
        var result = fetch('/mymensa', {
            method: 'get',
        }).then(function (response) {
            return response.json(); // pass the data as promise to next then block
        }).then(function (data) {
            canteen_id = data[0].id;
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

            var urli = 'https://openmensa.org/api/v2/canteens/' + canteen_id + '/days/' + day_date + '/meals'

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

        fetchingGerichte.then(essen => this.setState({ essen }))
        .then(async() => {
            const response = await fetch('/mygericht')
            const data = await response.json()
            const essen = this.state.essen
            for (var i in essen) {
                for (var j in data) {
                    if (data[j].name == essen[i].name && Notification.permission === "granted") {
                        NotificationManager.info('Heute gibt es ' + essen[i].name);
                    }

                }
            }

        }
        );



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

                        <p id='cardsMain'>
                            {essen2[i].name}
                        </p>
                        <p id='cardsNotizen'>
                        ANMERKUNGEN: {essen2[i].notes + ' '}
                        </p>
                        <h4 id='cardsSubtitel'>Preise</h4>
                        <p id='cardsGerichte'>
                            Student: {essen2[i].prices.students + ' € / '} Mitarbeiter: {essen2[i].prices.employees + ' € / '} 
                            Andere: {essen2[i].prices.others + ' €'}
                        </p>
                        </CardContent>
                        <CardActions className={classes.likeButton}>
                            <LikeIcon g={essen2[i]} />
                        </CardActions>
                    </Card>
                );
            }
            return foods;
        } else {
            return (
                <div>
                    <p id='emptyList'>Heute gibt es kein Essen</p>
                    <SentimentVeryDissatisfiedIcon className={classes.Icon}/>
                </div>
            )

        }
    };

    


    render() {
        const isEmpty2 = isEmpty(this.state.date)
        //const { classes } = this.props;
        return (
            <div>
                <h2 id='HomeTitle2'>Datum</h2>
                <hr id='line'></hr>
                {
                    (isEmpty2) ?
                        <div >
                            <p id='HomeDate'><IconButton color="secondary" aria-label="add an alarm" onClick={this.backDay}>
                                    <ArrowBackIosOutlinedIcon />
                                </IconButton> {this.state.date.date} <IconButton color="secondary" aria-label="add an alarm" onClick={this.nextDay}>
                                    <ArrowForwardIosIcon />
                                </IconButton></p>
                        </div>


                        : <div>
                            <p id='HomeDate'><IconButton color="secondary" aria-label="add an alarm" onClick={this.backDay}>
                                    <ArrowBackIosOutlinedIcon />
                                </IconButton> {this.state.safeDate} <IconButton color="secondary" aria-label="add an alarm" onClick={this.nextDay}>
                                    <ArrowForwardIosIcon />
                                </IconButton></p>
                        </div>


                }<h2 id='HomeTitle2'>Gerichte</h2>
                <hr id='line'></hr>
                {this.EssenFoods()}
                <NotificationContainer />
            </div>



        )
    }
}

export default withStyles(useStyles)(TimeHome) 