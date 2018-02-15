import React, { Component } from 'react';
import PropTypes from "prop-types"
import { connect } from 'react-redux';
import { Button, Modal, Dropdown } from 'semantic-ui-react'
import { updateTenantId } from '../shared';
import _ from 'lodash';
import { loadTenants } from './actions';

class TenantComponent extends Component {
    static propTypes = {
        updateTenantId: PropTypes.func.isRequired,
        loadTenants: PropTypes.func.isRequired,
        app: PropTypes.object,
        tenant: PropTypes.object
    }
    
    constructor(props){
        super(props);
        this.state = { selectedItem: "", showDialog: true}
        this.props.loadTenants();
    }

    handleChange(event, { value }) {
        this.setState({ selectedItem: value });
    };

    render() {
        const { tenantList } = this.props.tenant;
        const { app } = this.props;

        return (           
            <Modal
                closeOnDimmerClick={false}
                closeOnDocumentClick={false}
                size='mini'
                open={this.state.showDialog}>
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
                        disabled={!this.state.selectedItem}
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content='Save'
                        onClick={this.handleSave = this
                            .handleSave
                            .bind(this)} />
                </Modal.Actions>
            </Modal>
        );
    }

    handleSave() {
        this.props.updateTenantId(this.state.selectedItem, res => {
            if (res) {
                this.setState({ showDialog: false })
            }
        });
    }

    renderSelectList() {
        const { tenantList } = this.props.tenant;
        const items = [];
        tenantList.forEach(tenant => {
            items.push({ value: tenant.id, text: tenant.tenantName })
        });
        return <Dropdown
            fluid
            selection
            onChange={this.handleChange = this
                .handleChange
                .bind(this)}
            placeholder="Bitte wähle eine Abteilung"
            options={items} />;
    }
}

function mapStateToProps(props) {
    let newProps = {
        tenant: props.tenant,
        app: props.app
    }
    return newProps;
}

export default connect(mapStateToProps, { updateTenantId, loadTenants })(TenantComponent);