import { IonContent, IonText, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg } from '@ionic/react';
import React, { Component } from 'react';
import './Login.css';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

const INITIAL_STATE = {

};

GoogleAuth.initialize({
  scopes: ['profile', 'email'],
  grantOfflineAccess: true,
});

class Login extends Component {
  state: any = {};
  props: any = {};
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  async signIn(): Promise<void> {
    const { history } = this.props;
    const result = await GoogleAuth.signIn();
    console.info('result', result);
    if (result) {
      history.push({
        pathname: '/home',
        state: { name: result.name, image: result.imageUrl, email: result.email }
      });
    }

  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Ionic React App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonRow>
            <IonCol className="text-center">
              <IonImg className="title-img" src="assets/capacitor.png" ></IonImg>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="text-center">
              <IonText className="title">
                Google Login in Capacitor app
              </IonText>
            </IonCol>
          </IonRow>

          <IonButton className="login-button" onClick={() => this.signIn()} expand="block" fill="solid" color="danger">
            Login with Google
          </IonButton>
        </IonContent>
      </IonPage>
    )
  }
}

export default Login;