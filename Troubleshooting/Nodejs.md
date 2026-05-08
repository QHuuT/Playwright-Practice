# Le terme « npm » n'est pas reconnu comme nom d'applet de commande, fonction, fichier de script ou programme exécutable. Vérifiez l'orthographe du nom, ou si un chemin d'accès existe, vérifiez que le chemin d'accès est correct et réessayez.

## Description

Erreur obtenue lors d'une commande npm. Cette erreur se produit lorsque Node.js n'est pas détecté comme installé.

## Procédure de reproduction

npm install -g npm
 
    npm : Le terme « npm » n'est pas reconnu comme nom d'applet de commande, fonction, fichier de script ou programme exécutable. Vérifiez l'orthographe du nom, ou si un chemin d'accès existe, vérifiez que le chemin d'accès est correct et réessayez.
    Au caractère Ligne:1 : 1
    + npm init playwright@latest
    + ~~~
    + CategoryInfo          : ObjectNotFound: (npm:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

## Résolution

- Résinstaller [Node.js](https://nodejs.org/en)
- Redémarrer l'ordinateur