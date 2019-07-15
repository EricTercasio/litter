package com.example.litter.controller;


import com.example.litter.dao.RoleRepository;
import com.example.litter.dao.TrashRepository;
import com.example.litter.dao.UserRepository;
import com.example.litter.message.request.LoginForm;
import com.example.litter.message.request.SignUpForm;
import com.example.litter.message.response.JwtResponse;
import com.example.litter.message.response.ResponseMessage;
import com.example.litter.model.Role;
import com.example.litter.model.RoleName;
import com.example.litter.model.Trash;
import com.example.litter.model.User;
import com.example.litter.security.jwt.JwtProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    TrashRepository trashRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtProvider jwtProvider;


    @PostMapping("api/new/trash")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public @ResponseBody Trash createTrash(@RequestBody Trash trash){
        Trash newTrash = new Trash();
        newTrash.setMessage(trash.getMessage());
        newTrash.setLikes(0);
        newTrash.setUsername(trash.getUsername()); //Username of the creator
        return trashRepository.save(newTrash);
    }

    @GetMapping("api/all/trash")
    public @ResponseBody Iterable<Trash> getAllTrash(){
        return trashRepository.findAll();
    }



}
