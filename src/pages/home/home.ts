import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';


const AllUsers = gql`
  query AllUsers {
    allUsers {
      id
      first_name
      last_name
    }
  }
`;


const addUser = gql`
  mutation addUser($first_name:String!, $last_name:String!, $email:String!) {
    addUser(first_name: $first_name, last_name: $last_name, email: $email) {
      id
    }
  }
`;

const deleteUser = gql`
  mutation deleteUser( $id : String! ) {
    deleteUser(id:$id) {
      id
    }
  }
`;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  title = 'app';
  model = {};
  allUsers: ApolloQueryObservable<any>;

  constructor(public navCtrl: NavController, private apollo: Apollo) {

  }

  ngOnInit() {
    this.allUsers = this
      .apollo
      .watchQuery({ query: AllUsers });

    this.allUsers.subscribe(() => { })
  }


  deleteUser(_id) {
    console.log(_id);

    this.apollo.mutate({
      mutation: deleteUser,
      variables: { id: _id }
    }).subscribe(({ data }) => {
      console.log('got data', data);

      this.allUsers.refetch();

    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }


  addUserClicked() {
    console.log(this.model);

    this.apollo.mutate({
      mutation: addUser,
      variables: this.model
    }).subscribe(({ data }) => {
      console.log('got data', data);

      this.allUsers.refetch();

    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }
}

