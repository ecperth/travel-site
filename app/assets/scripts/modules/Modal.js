import $ from 'jquery';

class Modal{
    constructor(){
        this.modal = $('.modal');
        this.modalClose = $('.modal-close');
        this.modalOpen = $('.modal-open'); 
        this.events();
    }

    events() {
        this.modalClose.click(this.closeModal.bind(this));
        this.modalOpen.click(this.openModal.bind(this));

        $(document).keyup(this.keyPressHandler.bind(this));
    }

    keyPressHandler(e){
        if (e.keyCode == 27){
            this.closeModal();
        }
    }

    closeModal() {
        this.modal.removeClass("modal-open");
    }

    openModal() {
        this.modal.addClass("modal-open");
        return false;
    }
}

export default Modal; 