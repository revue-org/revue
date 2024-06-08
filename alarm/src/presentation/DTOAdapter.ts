interface DTOAdapter<E extends Entity> {

    get dto(): any

    get entity(): E

}
