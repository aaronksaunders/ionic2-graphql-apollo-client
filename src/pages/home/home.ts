import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';


const AllCompanies = gql`
  query AllCompanies {
    allCompanies {
      id
      name
    }
  }
`;

const AllUsersWithCompany = gql`
  query AllUsers {
    allUsers {
      id
      first_name
      last_name
      company {
        id
        name
      }
    }
  }
`;


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
  mutation addUser($first_name:String!, $last_name:String!, $email:String!, $companyId: ID!) {
    addUser(first_name: $first_name, last_name: $last_name, email: $email, companyId : $companyId) {
      id
      first_name
      last_name
      email
      company {
        id
        name
      }
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
  model: any = {};
  allUsers: ApolloQueryObservable<any>;
  allCompanies: ApolloQueryObservable<any>;
  defaultCompany = {
    id : null,
    name : 'Pick Company'
  }

  constructor(public navCtrl: NavController, private apollo: Apollo) {

  }

  ngOnInit() {
    this.allUsers = this
      .apollo
      .watchQuery({ query: AllUsers });

    // get all the companies for the input form

    this.allCompanies = this
      .apollo
      .watchQuery({ query: AllCompanies });
  }


  deleteUser(_id) {
    console.log(_id);

    this.apollo.mutate({
      mutation: deleteUser,
      variables: { id: _id },


      // this will provide an update of the main AllUsers
      // query so the list gets updated...
      updateQueries: {
        AllUsers: (prev, { mutationResult }) => {
          const deletedUser = mutationResult.data.deleteUser;
          const prevAllUsers = prev.allUsers;

          return {
            allUsers: prevAllUsers.filter((u) => { return u.id !== deletedUser.id })
          };
        },
      },
    }).subscribe(({ data }) => {
      console.log('got data: deleted user', data);

    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }


  addUserClicked(_formValue) {
    console.log(_formValue);

    let params = Object.assign(_formValue, {companyId : _formValue.company.id})

    this.apollo.mutate({
      mutation: addUser,
      variables: params,

      // this will provide an update of the main AllUsers
      // query so the list gets updated...
      updateQueries: {
        AllUsers: (prev, { mutationResult }) => {
          const newUser = mutationResult.data.addUser;
          const prevAllUsers = prev.allUsers;

          return {
            allUsers: [...prevAllUsers, newUser]
          };
        },
      },
    }).subscribe(({ data }) => {
      console.log('got data', data);

    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }
}

