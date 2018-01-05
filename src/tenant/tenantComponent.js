import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Modal, Dropdown} from 'semantic-ui-react'
import {hideTenantDialog} from './actions';
import _ from 'lodash';

class TenantComponent extends Component {
    state = {
        loading: false
    };

    handleChange(event, {value}) {
        this.setState({selectedItem: value});
    };

    render() {
        return this.renderModal();
    }

    handleSave() {
        this.setState({loading: true});
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

    renderModal() {
        const {showDialog, tenantList} = this.props.tenant;

        return (
            <Modal
                closeOnDimmerClick={false}
                closeOnDocumentClick={false}
                size='mini'
                open={showDialog}>
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
                        loading={this.state.loading}
                        disabled={this.state.loading || !this.state.selectedItem}
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
}

function mapStateToProps(props) {
    return {tenant: props.tenant}
}

export default connect(mapStateToProps, {hideTenantDialog})(TenantComponent);