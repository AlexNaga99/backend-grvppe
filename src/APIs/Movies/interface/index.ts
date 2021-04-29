export interface interfaceMovies {
    page?: number,
}

export interface interfaceFavoriteMovies {
    id?: number,
}

export interface interfaceDeleteMovie {
    id?: number,
}

export interface interfaceInsertMovies {
    id?: number,
    idCustomer?: number,
    idMovie?: number,
    favorite?: boolean,
}

export interface interfaceFavoritesMovies {
    id?: number,
}