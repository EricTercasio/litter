package com.example.litter.controller;

import com.example.litter.dao.*;
import com.example.litter.model.*;
import com.example.litter.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;

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
    TrashLikeRepository trashLikeRepository;

    @Autowired
    UserSearchRepository userSearchRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtProvider jwtProvider;


    @PostMapping("api/trash")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public @ResponseBody Trash createTrash(@RequestBody Trash trash){
        Trash newTrash = new Trash();
        newTrash.setMessage(trash.getMessage());
        newTrash.setUsername(trash.getUsername()); //Username of the creator
        newTrash.setLikes(new Long(0));
        newTrash.setCreation_date(new Date());
        newTrash.setParent(null);
        ArrayList<Trash> trashArrayList = new ArrayList<>();
        newTrash.setChildren(trashArrayList);
        return trashRepository.save(newTrash);
    }

    @PostMapping("api/trash/reply")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public @ResponseBody Trash createReply(@RequestBody Trash trash){
        Trash newTrash = new Trash();
        newTrash.setLikes(new Long(0));
        newTrash.setMessage(trash.getMessage());
        newTrash.setParent(trash.getParent());
        newTrash.setUsername(trash.getUsername());
        newTrash.setCreation_date(new Date());
        return trashRepository.save(newTrash);
    }

    @GetMapping("api/trash/{tid}/replies")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public @ResponseBody Collection<Trash> getChildren(@PathVariable Long tid){
        return this.trashRepository.findChildrenById(tid);
    }

    @GetMapping("api/search/")
    public @ResponseBody Collection<User> searchUsers(@RequestParam(value = "search") String query){
        return this.userSearchRepository.searchUsersByKeywordQuery(query);
    }


    @GetMapping("api/trash")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public @ResponseBody Iterable<Trash> getAllTrash(){
        return trashRepository.findAll();
    }

    @GetMapping("api/trash/nonreplies")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public @ResponseBody Iterable<Trash> getNonReplyTrash(){
        return trashRepository.findByParentIdIsNull();
    }

    //Gets all the trash that's been liked by a user
    @GetMapping("api/trash/liked/{uid}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public @ResponseBody Iterable<TrashLike> getTrashLikedByUser(@PathVariable Long uid){
        return trashLikeRepository.findByUserId(uid);
    }


    @GetMapping("api/trash/{tid}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public @ResponseBody
    Optional<Trash> getTrashById(@PathVariable Long tid){
        return trashRepository.findById(tid);
    }

    @GetMapping("api/user/{username}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public @ResponseBody Long getUserIdByUsername(@PathVariable String username){
        Optional<User> optionalUser = userRepository.findIdByUsername(username);
        if(optionalUser.isPresent()){
            return optionalUser.get().getId();
        }else{
            return null;
        }

    }


    @PutMapping("api/trash/like/{tid}/{uid}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public @ResponseBody TrashResponse likeTrash(@PathVariable Long tid, @PathVariable Long uid){
        //First we need to check if this User has already liked this Trash
        Optional<TrashLike> trashLikeOptional = trashLikeRepository.findByUserIdAndTrashId(uid,tid);
        Optional<Trash> trashOptional = trashRepository.findById(tid);
        if(trashLikeOptional.isPresent()){
            //Then we are going to 'unlike', or simply delete.
            trashLikeRepository.delete(trashLikeOptional.get());
            Trash trash = trashOptional.get();
            TrashResponse trashResponse = new TrashResponse();
            trashResponse.setTrash(updateTrash(trash));
            trashResponse.setLiked(false); // Set to false for un-liking
            return trashResponse;
        }else {
            //Otherwise we are going to like, and add to the like repo
            if (trashOptional.isPresent()) {
                Trash trash = trashOptional.get();
                Optional<User> optionalUser = userRepository.findById(uid);
                if(optionalUser.isPresent()){
                    User user = optionalUser.get();
                    TrashLike trashLike = new TrashLike();
                    trashLike.setUser(user);
                    trashLike.setTrash(trash);
                    trashLikeRepository.save(trashLike);
                    TrashResponse trashResponse = new TrashResponse();
                    trashResponse.setTrash(updateTrash(trash));
                    trashResponse.setLiked(true); //Setting to true because we are liking.
                    return trashResponse;
                }else{
                    return null;
                }
            } else {
                return null;
            }
        }
    }


    public Trash updateTrash(Trash newTrash){
        Optional<Trash> optionalTrash = trashRepository.findById(newTrash.getId());
        if(optionalTrash.isPresent()){
            Trash trash = optionalTrash.get();
            trash.setUsername(newTrash.getUsername());
            trash.setMessage(newTrash.getMessage());
            //Count the likes..
            Long totalLikes = trashLikeRepository.countByTrashId(trash.getId());
            trash.setLikes(totalLikes);
            return trashRepository.save(trash);
        }else{
            return null;
        }
    }





}
