import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Modal, Dropdown} from 'semantic-ui-react'
import { updateUserInformation } from '../shared';
import { loadTenants } from './actions';
import _ from 'lodash';

class TenantComponent extends Component {
    state = {
        loading: false,
        showDialog: true
    };

    componentWillMount(){
        this.props.loadTenantList();
    }

    handleChange(event, {value}) {
        this.setState({selectedItem: value});
    };

    render() {
        const {tenantList} = this.props.tenant;

        return (
            <Modal
                closeOnDimmerClick={false}
                closeOnDocumentClick={false}
                size='mini'
                open={ this.state.showDialog }>
                <Modal.Header>
                    Zuordnung wählen
                </Modal.Header>
                <Modal.Content>
                    {tenantList && (this.renderSelectList())}
                    {!tenantList && (
                        <div>
                            <Button disabled loading primary>Loading</Button>
                        </div>
                    )}
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        loading={false} //change this to global loader if developed
                        disabled={ !this.state.selectedItem}
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content='Save'
                        onClick={this.handleSave = this
                        .handleSave
                        .bind(this)}/>
                </Modal.Actions>
            </Modal>
        );
    }

    handleSave() {
        this.props.updateUserInfo(this.state.selectedItem, res => {
            if(res){
                this.setState({ showDialog : false})
            }
        });
    }

    renderSelectList() {
        const {tenantList} = this.props.tenant;
        const items = [];
        tenantList.forEach(tenant => {
            items.push({value: tenant.id, text: tenant.tenantName})
        });
        return <Dropdown
            fluid
            selection
            onChange={this.handleChange = this
            .handleChange
            .bind(this)}
            placeholder="Bitte wähle eine Abteilung"
            options={items}/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
      updateUserInfo: id => {
        dispatch(updateUserInformation(id))
      },
      loadTenantList: () => {
          dispatch(loadTenants());
      }
    }
  }

function mapStateToProps(props) {
    let newProps = {
        tenant: props.tenant,
        app: props.app
    }
    return newProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(TenantComponent);