
import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Switch from '@material-ui/core/Switch';

class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: localStorage.getItem('status') || false
        };
        this.nextDay = this.handleChange.bind(this);
    }

    componentDidMount(){
        if(Notification.permission !== "granted"){
            localStorage.removeItem('status')
            
        }else{
            localStorage.getItem('status', true)
            this.setState({status: true})
        }
    }

    handleChange = () => {
        this.setState({status: true})
        
        if (Notification.permission === 'default') {
            
            if (!("Notification" in window)) {
                alert("This browser does not support desktop notification");
            }

            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    NotificationManager.info('Notification wurde activiert');
                    
                } else {
                    console.log('User blocked notifications.');
                }
            }).catch(function (err) {
                console.error(err);
            });

        }
    }

    render() {

        return (
            <div key="notification">
                <h2 id='HomeTitle2'>Benachrichtigungen verwalten</h2>
                <hr id='line' />
                <div>
                    <h2 id='HomeTitle2'>Lieblingsgericht</h2>
                    <p>Du bekommst eine Benachrichtigung, wenn dein Lieblingsgericht angeboten wird</p>
                    <Switch
                        checked={this.state.status}
                        onChange={this.handleChange}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <NotificationContainer />

                </div>

            </div>
            
        );
    }
}

export default Notifications;
