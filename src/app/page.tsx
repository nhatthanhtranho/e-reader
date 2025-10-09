"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isOpenMainSettings, setIsOpenMainSettings] = useState(false);
  return (
    <div className="relative">
      <div className="bg-white p-3 shadow cursor-pointer">
        <div className="hover:bg-gray-100 p-2 mb-2 rounded">
          <Image width={25} height={25} src="/icons/settings.svg" alt="" />
        </div>
      </div>
      <div className="p-4 w-96 bg-white shadow text-gray-600 relative">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Cài đặt</h2>
        <button className="absolute top-3 right-3 cursor-pointer transition">
          <Image width={25} height={25} src="/icons/close.svg" alt="Đóng" />
        </button>
        <div className="mb-2 flex items-center gap-3">
          <h3 className="text-lg font-semibold">Giao diện:</h3>
          <div className="flex gap-2">
            <div className="p-2 bg-whie border-gray-200 border-3 overflow-hidden shadow rounded-full cursor-pointer">
              <Image width={25} height={25} src="/icons/sun.svg" alt="" />
            </div>
            <div className="p-2 bg-gray-600 border-gray-200 border-3 overflow-hidden shadow rounded-full cursor-pointer">
              <Image width={25} height={25} src="/icons/moon.svg" alt="" />
            </div>
            <div className="p-2 bg-orange-800 border-gray-200 border-3 overflow-hidden shadow rounded-full cursor-pointer">
              <Image width={25} height={25} src="/icons/cloud.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="mb-2 flex items-center gap-3">
          <h3 className="text-lg font-semibold">Cỡ chữ:</h3>
          <div className="flex gap-2">
            <div className="p-2 hover:bg-gray-100 cursor-pointer bg-white overflow-hidden">
              <Image width={25} height={25} src="/icons/up.svg" alt="" />
            </div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer bg-white overflow-hidden">
              <Image width={25} height={25} src="/icons/down.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <p className="container mx-auto bg-white py-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
        scelerisque fringilla dui, sed tempor lacus fermentum nec. Pellentesque
        et ipsum ullamcorper, mollis urna varius, pellentesque ex. Aliquam
        hendrerit lorem et massa dictum lacinia. Duis vitae ullamcorper libero.
        Fusce nec placerat erat. Quisque vehicula imperdiet scelerisque.
        Vestibulum non nibh laoreet, sagittis arcu consectetur, placerat enim.
        Praesent vulputate, libero tristique condimentum faucibus, lacus lacus
        porta turpis, eget ornare ex leo sit amet ex. In hac habitasse platea
        dictumst. Nulla in justo nulla. Pellentesque malesuada ac velit vitae
        sollicitudin. Praesent a felis tincidunt urna tristique rhoncus. Ut quis
        molestie enim, sit amet bibendum est. Fusce ornare tellus at dolor
        pharetra, non sollicitudin nunc imperdiet. Ut ut suscipit arcu. Mauris
        urna sapien, vehicula id tortor a, venenatis aliquet sapien. Mauris urna
        libero, suscipit eget dictum at, fermentum quis velit. Mauris venenatis
        fringilla pulvinar. Phasellus convallis orci nisi, volutpat commodo
        metus auctor a. Phasellus pulvinar tortor nulla, eget posuere odio
        tristique in. Integer mollis ut nulla eu cursus. Vestibulum eget rhoncus
        augue, in interdum felis. Etiam elementum mauris id mauris posuere
        convallis. Mauris arcu nibh, molestie et cursus quis, placerat ut
        mauris. Duis quis posuere lectus. Aenean quis diam nec risus ultrices
        tempus. Ut nisl ipsum, malesuada a bibendum at, tempus et turpis. Fusce
        sagittis eros felis, finibus suscipit lectus lobortis id. Ut nec nibh ac
        elit laoreet porta. Curabitur sagittis tortor lectus. Etiam pulvinar
        molestie posuere. Proin dictum accumsan mi. In vulputate ornare viverra.
        Suspendisse luctus ullamcorper nisl, vel laoreet magna pretium quis.
        Suspendisse id lacus non quam finibus commodo sit amet viverra ex.
        Pellentesque ac ipsum felis. Morbi rutrum mauris libero, non mollis
        ligula vehicula eu. Nunc auctor velit ac sem egestas, nec suscipit nulla
        euismod. Pellentesque lacinia nisl nunc, non semper libero aliquam in.
        Duis vel aliquam justo, sed blandit quam. Quisque scelerisque risus et
        purus pulvinar, in finibus sem tincidunt. Nunc ut mauris sed felis
        aliquam pellentesque. Nunc viverra lobortis nisi, vel sagittis ex
        ullamcorper sit amet. Vivamus tempor tempus dapibus. Vivamus at est a
        enim vehicula semper sed a magna. Integer id ex hendrerit, ultrices ante
        id, egestas nunc. Sed finibus nulla tortor, gravida varius arcu ultrices
        id. Nunc sed dolor a quam suscipit volutpat ac in felis. Nullam
        porttitor, velit quis ornare pulvinar, dolor massa porta ante, non
        interdum nisi lorem vel est. Quisque ultricies finibus sapien sed
        blandit. Quisque ac faucibus ante. Donec venenatis odio a scelerisque
        lobortis. Morbi convallis lacus id justo suscipit tristique. Praesent at
        semper libero, eu commodo velit. Ut vehicula, quam sed congue mollis,
        magna sem laoreet lectus, in tempus dui lorem at neque. Pellentesque
        fermentum metus dignissim sapien molestie viverra. Etiam in efficitur
        massa. Curabitur in sapien placerat, pharetra lorem ac, porta est.
        Aliquam molestie vel ex ut varius. Vestibulum laoreet arcu id sapien
        sodales dignissim. Curabitur at dolor lacinia, convallis nibh eget,
        porta massa. Sed pharetra purus dui, quis commodo neque pulvinar in.
        Etiam vitae ipsum mollis, commodo leo id, condimentum ipsum. Duis auctor
        tempor orci eget eleifend. Curabitur metus justo, bibendum quis
        imperdiet nec, bibendum nec diam. Etiam imperdiet ligula tempor
        convallis ultricies. Cras pellentesque risus vitae nisl pulvinar, eu
        finibus elit facilisis. Fusce hendrerit vehicula massa sit amet
        ultricies. In hac habitasse platea dictumst. Ut in mi non mi ullamcorper
        eleifend. Morbi finibus enim eu dui accumsan, non dictum elit gravida.
        Duis quis lorem quis enim lacinia porta. Vivamus semper lorem vitae
        ultricies accumsan. Curabitur accumsan urna at turpis faucibus tempor.
        Etiam luctus faucibus massa, vel eleifend justo viverra at. Donec
        consectetur ante sagittis ante pulvinar, at vulputate metus luctus.
        Proin mattis ante quis nibh viverra venenatis. Donec cursus mauris
        magna, eu lacinia lacus luctus eu. Ut eget risus quis lorem finibus
        varius. Suspendisse a massa tellus. In hac habitasse platea dictumst.
        Fusce vitae magna in dui rutrum egestas eget ac orci. Nunc a metus
        dapibus, tempor dolor id, molestie augue. Aliquam dignissim neque at
        metus tempor, consectetur tincidunt erat tincidunt. Duis feugiat egestas
        mi a laoreet. In eget tincidunt ipsum, vel scelerisque neque. Fusce et
        condimentum leo. Aliquam ac eros venenatis, tempus nulla vitae, tempus
        ligula. Maecenas dapibus porttitor mi ac elementum. Proin leo dolor,
        hendrerit at augue ac, sollicitudin vulputate nibh. Mauris nec sapien
        mauris. Nulla efficitur interdum turpis nec posuere. Pellentesque eget
        aliquet lorem. Vestibulum eget aliquet elit. Nulla ut sem mi. Fusce
        tempor consequat mauris, quis tempor sapien bibendum vel. Nunc in
        rhoncus odio, condimentum rutrum quam. Fusce pharetra lobortis sapien ut
        vehicula. Maecenas bibendum pellentesque mi vel vehicula. Cras sed
        aliquam purus, at sodales ipsum. Donec sed ultricies enim. Donec tempor
        lectus ut ex vehicula mattis.
      </p>
    </div>
  );
}
