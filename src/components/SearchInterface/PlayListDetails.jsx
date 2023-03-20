import React from "react";

export default function PlayListDetails({ data }) {
  console.log(data)
  return (
    <>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}

[
  {
    _id: "6415e4f12ee8f7b368d850f9",
    name: "Playlist 1",
    userId: "64104e3bec1232725cdc0c92",
    songs: [
      {
        _id: "64109fccb24f44d68778e5b9",
        songName: "Boom Boom Robo Da",
        artistId: "64108b2c628cf6a5ae0d44b9",
        albumId: "64109a4cb24f44d68778e57f",
        songImage:
          "https://storage.googleapis.com/hybrid-heaven-363612.appspot.com/image/uploads/songImage-1678811090064.webp?GoogleAccessId=firebase-adminsdk-3aeuh%40hybrid-heaven-363612.iam.gserviceaccount.com&amp;Expires=16730303400&amp;Signature=GGdpNz16tftKgkeU85Uhj1URjVYqZ27UPOEzqouMmzVnCNW4g4J2eDtlMKthEvfNDpbVYnxj%2FAwdDTqhen84CTQ0eqPAXKJouzfdCi%2F%2FkQN7up7PBfnpeWvDQ78jqS0T8Jf7icKtgOL998eWxX8NSzBzL%2FZ7r9aOVt4klsfdra8kGnlDVUxUYGIerwqfo%2BFQCbNKReFaQvuG7B9tNAO6gXjxZ74UNTslL6AAf0Olg4lHPHca9qJC8wYw9J9NFM4C%2BqA7SHbmSBaN%2B8AYTiKi6rjMnutA%2BKCAaJ9zn02akbpll6OHN5AzMMgWtCoIOQ3OSjRmvmoYOPQCgA0lJ8h6Lw%3D%3D",
        songFile:
          "https://storage.googleapis.com/hybrid-heaven-363612.appspot.com/audio/uploads/songFile-1678811073200?GoogleAccessId=firebase-adminsdk-3aeuh%40hybrid-heaven-363612.iam.gserviceaccount.com&amp;Expires=16730303400&amp;Signature=WHPCRl%2F9j%2B9%2BWaUF1fXC%2BBZLbwSs%2FG%2FGXHrXq8oSTFgsmLXSYGRP7sESFaKvbVXg%2B0rRyOJwq1J%2FRTgAM4DZyZAZZ24kECzUQchM94rruWIVnN54bcUfv8u4iZI3nn6XIuHsg8qWn4J25Zadd6RvSvz%2BAznyE9uzsWME6%2Fp1D1RqPF0ag3QY8W%2FOsu8fUw43FM3Two82eFPGI6Q1ksivhYJbGyYgn2CMIhRvtPeEcrBw8eI6NX4EiH9jm4ZkrIMC1qvTLHJNhe0ORhvZ1mgIFUbsqvtzaITIW5BA2TyipYShCwxbCmXUaZQvH1NvhZW335aZZlZXooT5cDlhYtYVAQ%3D%3D",
        totalLikes: 0,
        liked: false,
      },
      {
        _id: "6410a040b24f44d68778e5c7",
        songName: "Kadal Anukkal",
        artistId: "64108b2c628cf6a5ae0d44b9",
        albumId: "64109a4cb24f44d68778e57f",
        songImage:
          "https://storage.googleapis.com/hybrid-heaven-363612.appspot.com/image/uploads/songImage-1678811205113.webp?GoogleAccessId=firebase-adminsdk-3aeuh%40hybrid-heaven-363612.iam.gserviceaccount.com&amp;Expires=16730303400&amp;Signature=u4ohY34HbtWKoGuc8yRHN4r97%2BVSUEI6YJNE%2BGNNoGDkw3OFEPvqrZjkFbb%2F6e0kss2eoSXbwFWznW%2BSQPk2eqxYWv4cuUaXoVCXaAR5%2FiT95l7C1kgIOZEJZEilu%2B4QNtrwGv4FxDETIWIwmpHTydvfnwHCbkFVzmFGIzvoKlkiC9zOGFtoosSLv6sKIu9egtwIPXnkKNL%2BnIC8Bm%2F2bOtDOinR2ardk1gFKPw1JJTGh%2FwxZmceGOjhGnphQa6fJdW8C7tT9UjRPdzHlzXxjrma4M4ceTNwU%2BIbAWZEpjH9UgFQJOAScpJbjHmIS%2BYP6peCNT4C1dvTVGzmHflVvA%3D%3D",
        songFile:
          "https://storage.googleapis.com/hybrid-heaven-363612.appspot.com/audio/uploads/songFile-1678811179800?GoogleAccessId=firebase-adminsdk-3aeuh%40hybrid-heaven-363612.iam.gserviceaccount.com&amp;Expires=16730303400&amp;Signature=ByThKGoasHy1iNli0r17TsMUJLKz3PKb6NdJGjenp7Wx6TU%2FPG5YyybXXcGVv1i8Hqj%2FkBEkWUWfG5FTaR1mqWgNN4RoI3cGQtiQCKtl5XIExokX2qltfWXr5QnOyk3vtdHs%2F6iZF35V8rGpG7TrzxzJLgE61A4ld1VQDL6J8ZPMAAKigwsTHAfcnBxEVQ%2Ft14yZjmcu5Qs%2Fln6tvMexRQFwK2Omj%2FXi4cFygbX6IEP3Nf9on9PWfWKwvSBHLY5LFGm7BhpO9OV5HEnOVjSpYoUgC6n4P2twEy2j3ppa1IFQGKtXPE5eZu8i%2BxMOkTbt%2F%2B5tgKYKha95InOu6tmjQw%3D%3D",
        totalLikes: 0,
        liked: false,
      },
      {
        _id: "6410a2da86ca5acfb3eb3654",
        songName: "Naane Varugiraen",
        artistId: "64108b2c628cf6a5ae0d44b9",
        albumId: "64109a2eb24f44d68778e57c",
        songImage:
          "https://storage.googleapis.com/hybrid-heaven-363612.appspot.com/image/uploads/songImage-1678811876844.webp?GoogleAccessId=firebase-adminsdk-3aeuh%40hybrid-heaven-363612.iam.gserviceaccount.com&amp;Expires=16730303400&amp;Signature=K4tMeP9z98on5rOPRJwjNcbccTRrKsd1zt1lidiXFy0xnPavc0ztK%2B1qSgAbN0M7ObZNtdMS5ulBetZUWhw9zItgoWwuIZPaPnJzzF2qPP6iTjJwG4zXH7BJ8eZosW5TTil8VGCFyh63Vm9reuSzZCkUKSusNFLSBsYL%2FtIMHmB%2FCAabUV91agscLUbo4knPEGWuQzqrVA4HqsA%2B6VYUKIwTOpD%2B%2FhLqRHbjLsLG150TOdZPePXVrtiqGA%2BW1x1oiyshpIz5S42RHyKuJxHpAIRsFeWL%2BK2yG3Bd5y85LdK8lwBx99Asarna4Ybxg8P9q620UicivPPMKotNfobj1g%3D%3D",
        songFile:
          "https://storage.googleapis.com/hybrid-heaven-363612.appspot.com/audio/uploads/songFile-1678811806511?GoogleAccessId=firebase-adminsdk-3aeuh%40hybrid-heaven-363612.iam.gserviceaccount.com&amp;Expires=16730303400&amp;Signature=gsHLFXMeuvXBGyFEP%2FFWQqv5DKZXSt1HlwELC%2BjF1tZBU5halhvH%2BF01pgOWhfm4Nm10JNUiS1xgXI9V8y43oDI9k8HhYWvwRAm8hmeXZdgTiSaeoVdblM9luFlzXYVi1%2Fa%2Bx6ZqhsLzMxt6VDUXcjlYWFQeoqA%2F0AxolmpAJiVN%2BGLMw%2FoT6fK5jXbJh44OXBmIZ3iIrQ%2BCRBObhFAQWaGukBwOo3PqewwJKhiqQuSYbghT5HRCmvHs73m6wvbqkYOEW73QwYTHPACVewMj6bD9b8Xzck9TYtmlGth4Tc7nWCuYXu3BhVUZDQSH88JIsJS5u%2BRwGJTWzlAmtaUI5g%3D%3D",
        totalLikes: 0,
        liked: false,
      },
    ],
  },
];
