import React from "react";
import styles from "./Profile.module.css";
import edit from "../../img/icon/edit.png";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };
  onEditMode = () => {
    this.setState({ editMode: true });
  };
  offEditMode = () => {
    this.setState({ editMode: false });
    this.props.updateStatus(this.state.status);
  };
  onStatusChange = (e) => {
    this.setState({ status: e.currentTarget.value });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }
  // target цепляется к объекту на котором висит обработчик, и идёт вниз по дереву
  // currentTarget срабатывает только по элементу на который повешен обработчик
  render() {
    return (
      <div>
        {/* this.state.editMode == true, то && возвращает последнее значение true */}
        {/* Когда значение false - выполни: */}
        <div>
          {!this.state.editMode && (
            <div>
              <div className={styles.editStatus} onClick={this.onEditMode}>
                <span className={styles.editStatusText}>
                  {this.props.status ? (
                    this.props.status
                  ) : (
                    <span className={styles.addStatus}>Добавить статус</span>
                  )}
                </span>
                <img src={edit} alt="" />
              </div>
            </div>
          )}
          {/* Когда значение true - выполни: */}
          {this.state.editMode && (
            <div>
              <input
                value={this.state.status}
                onChange={this.onStatusChange}
                onBlur={this.offEditMode}
                autoFocus
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileStatus;
